export default {
  data() {
    return {
      users: [],
      successMessage: "",
      userName: "",
      userLastName: "",
      userPosition: "",
      userPhone: "",
      userAddress: "",
      userInterests: [],
      newInterest: "",
      userProfileLink: "",
      profileLinks: [],
      userAvatarPreview: "",
      userEmail: "",
      userPitch: "",
      profileVisibility: "Private",
      errors: {
        userName: "",
        userLastName: "",
        userPosition: "",
        userPhone: "",
        userAddress: "",
        userInterests: "",
        userProfileLink: "",
        userAvatar: "",
        newInterest: "",
      },
      availableTags: [
        "JavaScript",
        "vue.js",
        "react.js",
        "node.js",
        "html",
        "css",
        "python",
        "c++",
        "java",
        "mongo DB",
        "MySQL",
      ],
      showTagList: false,
    };
  },

  mounted() {
    this.loadDataFromLocalStorage();
  },

  methods: {
    // Activate the hidden input field to select a file
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    // File change handler
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.userAvatarPreview = reader.result;
          this.saveData();
        };
        reader.readAsDataURL(file);
      } else {
        this.errors.userAvatar = "Select an image";
      }
    },
    // Loading data from localStorage
    loadDataFromLocalStorage() {
      try {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          this.userName = parsedData.userName || "";
          this.userLastName = parsedData.userLastName || "";
          this.userPosition = parsedData.userPosition || "";
          this.userPhone = parsedData.userPhone || "";
          this.userAddress = parsedData.userAddress || "";
          this.userInterests = parsedData.userInterests || [];
          this.profileLinks = parsedData.profileLinks || [];
          this.userAvatarPreview = parsedData.userAvatarPreview || "";
          this.userEmail = parsedData.userEmail || "";
          this.userPitch = parsedData.userPitch || "";
          this.profileVisibility = parsedData.profileVisibility || "Private";
        }
      } catch (e) {
        console.error("Error loading data from localStorage:", e);
      }
    },

    // Saving data to localStorage
    saveData() {
      this.validateUserName();
      this.validateUserLastName();
      this.validateUserPosition();
      this.validateUserPhone();
      this.validateUserEmail();
      this.validateUserPitch();
      this.validateInterests();

      if (Object.values(this.errors).some((error) => error !== "")) {
        return;
      }

      // Create a user data object
      const userData = {
        userName: this.userName,
        userLastName: this.userLastName,
        userPosition: this.userPosition,
        userPhone: this.userPhone,
        userAddress: this.userAddress,
        userInterests: this.userInterests,
        profileLinks: this.profileLinks,
        userAvatarPreview: this.userAvatarPreview,
        userEmail: this.userEmail,
        userPitch: this.userPitch,
        profileVisibility: this.profileVisibility,
      };

      // Saving data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      this.successMessage = "Data saved successfully!";
      setTimeout(() => (this.successMessage = ""), 5000);

      // this.clearFields();
    },

    // Cancel changes
    cancelChanges() {
      this.loadDataFromLocalStorage();
    },

    // Toggle Tag List Visibility
    toggleTagList() {
      this.showTagList = !this.showTagList;
    },

    // Adding Interest
    addInterest(tag) {
      if (!this.userInterests.includes(tag)) {
        this.userInterests.push(tag);
      }
    },

    // Removing a Lead
    removeInterest(interest) {
      const index = this.userInterests.indexOf(interest);
      if (index > -1) {
        this.userInterests.splice(index, 1);
      }
    },

    // Adding a new profile link
    addProfileLink() {
      this.profileLinks.push({ siteName: "", link: "", errors: "" });
    },

    validateLink(link) {
      const urlPattern =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!link.link) {
        link.errors = "Link is required";
      } else if (!urlPattern.test(link.link)) {
        link.errors = "Invalid URL format";
      } else {
        link.errors = ""; // We remove the error if the validation was successful
      }
    },

    // Removing a profile link
    removeProfileLink(index) {
      this.profileLinks.splice(index, 1);
    },

    // Add a new interest manually
    addInterestManual() {
      this.validateNewInterest(); // Checking for errors
      if (this.errors.newInterest) return; // If there is an error, do not add it

      this.userInterests.push(this.newInterest); // Adding interest
      this.newInterest = ""; // Clearing the input field
    },

    // Validation of other fields (first name, last name, phone, etc.)
    validateUserName() {
      const regex = /^[a-zA-Zа-яА-Я\s]+$/;
      if (!this.userName) {
        this.errors.userName = "*No name entered";
      } else if (this.userName.length < 2 || this.userName.length > 50) {
        this.errors.userName = "Length: from 2 to 50 characters";
      } else if (!regex.test(this.userName)) {
        this.errors.userName = "Only letters and spaces are allowed";
      } else {
        this.errors.userName = "";
      }
    },

    validateUserLastName() {
      const regex = /^[a-zA-Zа-яА-Я\s]+$/;
      if (!this.userLastName) {
        this.errors.userLastName = "*Last name not entered";
      } else if (
        this.userLastName.length < 2 ||
        this.userLastName.length > 50
      ) {
        this.errors.userLastName = "om 2 to 50 characters";
      } else if (!regex.test(this.userLastName)) {
        this.errors.userLastName = "Only letters and spaces are allowed";
      } else {
        this.errors.userLastName = "";
      }
    },

    validateUserPosition() {
      if (this.userPosition.length > 100) {
        this.errors.userPosition =
          "The position cannot be more than 100 characters long";
      } else {
        this.errors.userPosition = "";
      }
    },

    validateUserEmail() {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.userEmail) {
        this.errors.userEmail = "*Email not entered";
      } else if (!regex.test(this.userEmail)) {
        this.errors.userEmail = "Invalid email format";
      } else {
        this.errors.userEmail = "";
      }
    },

    validateUserPitch() {
      if (this.userPitch.length > 300) {
        this.errors.userPitch = "Pitch cannot be more than 300 characters long";
      } else {
        this.errors.userPitch = "";
      }
    },

    validateUserPhone() {
      const regex = /^\+(\d{1,3})\d{10,14}$/;
      if (!this.userPhone) {
        this.errors.userPhone = "*Phone number not entered";
      } else if (!regex.test(this.userPhone)) {
        this.errors.userPhone =
          "Only numbers and the " +
          " symbol at the beginning. Length: 10 to 15 characters";
      } else {
        this.errors.userPhone = "";
      }
    },

    validateInterests() {
      if (this.userInterests.length > 10) {
        this.errors.userInterests = "Maximum 10 interests";
      } else {
        this.errors.userInterests = "";
      }
    },

    validateNewInterest() {
      if (!this.newInterest) {
        this.errors.newInterest = "Interest cannot be empty";
      } else if (this.userInterests.includes(this.newInterest)) {
        this.errors.newInterest = "This interest has already been added";
      } else {
        this.errors.newInterest =
          "Only numbers and the " +
          " symbol at the beginning. Length: 10 to 15 characters";
      }
    },
  },
};
