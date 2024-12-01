<template>
  <div class="container">
    <div class="left-part">
      <div class="profile">
        <img class="arrow" src="./../src/assets/img/arrow.png" alt="" />
        <h1>TROOD.</h1>
        <h5>Profile</h5>
      </div>

      <div class="projects">
        <h3>Projects:</h3>
        <div class="square">
          <h5>Create project</h5>
        </div>
      </div>

      <div class="tasks">
        <h3>Tasks:</h3>
        <div class="square">
          <h5>Create task</h5>
        </div>
      </div>
    </div>

    <div class="right-part">
      <div>
        <!-- Avatar container -->
        <div class="avatar-container" @click="triggerFileInput">
          <!-- Background picture (round background) -->
          <img
            v-if="!userAvatarPreview"
            src="./../src/assets/img/circle.png"
            alt="Circle"
            class="avatar-background"
          />

          <!-- Avatar picture -->
          <img
            v-if="userAvatarPreview"
            :src="userAvatarPreview"
            alt="Avatar"
            class="avatar-overlay"
          />

          <!-- Standard avatar (photo.png), which is always on top of the background -->
          <img
            v-if="!userAvatarPreview"
            src="./../src/assets/img/photo.png"
            alt="Default Avatar"
            class="avatar-img"
          />

          <!-- Hidden input for file upload -->
          <input
            type="file"
            ref="fileInput"
            @change="onFileChange"
            accept="image/jpeg, image/png, image/jpg"
            style="display: none"
          />
        </div>

        <!-- Form fields -->
        <input
          type="text"
          v-model="userName"
          placeholder="Name*"
          @blur="validateUserName"
        />
        <p class="error" v-if="errors.userName">{{ errors.userName }}</p>

        <input
          type="text"
          v-model="userLastName"
          placeholder="Lastname*"
          @blur="validateUserLastName"
        />
        <p class="error" v-if="errors.userLastName">
          {{ errors.userLastName }}
        </p>

        <input
          type="text"
          v-model="userPosition"
          placeholder="Job Title"
          @blur="validateUserPosition"
        />
        <p class="error" v-if="errors.userPosition">
          {{ errors.userPosition }}
        </p>

        <input
          type="text"
          v-model="userPhone"
          placeholder="Phone*"
          @blur="validateUserPhone"
        />
        <p class="error" v-if="errors.userPhone">{{ errors.userPhone }}</p>

        <!-- Email fields-->
        <input
          type="email"
          v-model="userEmail"
          placeholder="Email"
          @blur="validateUserEmail"
        />
        <p class="error" v-if="errors.userEmail">{{ errors.userEmail }}</p>

        <input type="text" v-model="userAddress" placeholder="Address" />
        <p class="error" v-if="errors.userAddress">{{ errors.userAddress }}</p>

        <!-- Pitch fields -->
        <input
          v-model="userPitch"
          placeholder="Pitch"
          @blur="validateUserPitch"
        />
        <p class="error" v-if="errors.userPitch">{{ errors.userPitch }}</p>
        <div>
          <!-- Error fot interests -->
          <p class="error" v-if="errors.userInterests">
            {{ errors.userInterests }}
          </p>
          <p class="mandatory-note">* - required field</p>
          <!-- Field for entering text of interest -->
          <input
            type="text"
            v-model="newInterest"
            placeholder="Enter a new interest"
          />
          <p class="error" v-if="errors.newInterest">
            {{ errors.newInterest }}
          </p>

          <div>
            <label>Interests:</label>
            <button @click="toggleTagList" class="add-tag-btn">+</button>

            <!-- List of tags -->
            <div v-if="showTagList" class="tag-list">
              <div
                v-for="(tag, index) in availableTags"
                :key="index"
                class="tag-item"
                @click="addInterest(tag)"
              >
                {{ tag }}
              </div>
            </div>
            <!--
            <p class="error" v-if="errors.userInterests">
              {{ errors.userInterests }} -->
            <!-- </p> -->
          </div>
        </div>

        <!-- Show selected interests -->
        <div class="selected-tags">
          <span
            v-for="(interest, index) in userInterests"
            :key="index"
            class="selected-tag"
          >
            {{ interest }}
            <button @click="removeInterest(interest)" class="remove-btn">
              x
            </button>
          </span>
        </div>

        <!-- Error by interests -->
        <p class="error" v-if="errors.userInterests">
          {{ errors.userInterests }}
        </p>

        <!-- Profile links -->
        <div class="profile-link-section">
          <div class="links-btn">
            <label>Links:</label>
            <button class="add-profile-link-btn" @click="addProfileLink">
              +
            </button>
          </div>

          <div
            v-for="(link, index) in profileLinks"
            :key="index"
            class="profile-link"
          >
            <div class="input-group">
              <input
                type="text"
                v-model="link.siteName"
                placeholder="Site name"
              />
              <input
                type="text"
                v-model="link.link"
                placeholder="Link"
                @blur="validateLink(link)"
              />
              <img
                src="./../src/assets/img/delete.png"
                alt="Delete"
                @click="removeProfileLink(index)"
                class="delete-icon"
              />
            </div>
            <p class="error" v-if="link.errors">{{ link.errors }}</p>
          </div>
        </div>

        <!-- Profile Visibility -->
        <div class="profile-visibility-container">
          <label>Show your profile in Launchpad?</label>
          <div class="radio-group">
            <div>

            </div>
            <label class="radio-label">
              <input
                type="radio"
                v-model="profileVisibility"
                value="Private"
                class="radio-button"
              />
              <span>Private</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="profileVisibility"
                value="Public"
                class="radio-button"
              />
              <span>Public</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <button @click="saveData()">Save</button>
        <button @click="cancelChanges()">Cancel</button>

        <!-- Successful save message -->
        <div v-if="successMessage" class="success-message">
          <p>{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./components/index.js"></script>

<style scoped src="./components/index.css"></style>
