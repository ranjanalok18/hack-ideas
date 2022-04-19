<template>
  <v-dialog v-if="show" value="true" persistent max-width="500">
    <v-card class="challenge-dialog__v-card">
      <v-row class="pop-up--header px-4 mb-2">
        <v-col class="pop-up--header--left" cols="8">
          <v-btn text @click="closeDialog()"> CLOSE </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn text @click="saveData()"> SAVE </v-btn>
        </v-col>
      </v-row>

      <v-text-field
        v-model="title"
        label="Title"
        outlined
        :readonly="payload.id ? true : false"
      />

      <v-select
        v-model="tagValue"
        :items="getTags"
        attach
        chips
        label="Chips"
        item-text="tagName"
        item-value="id"
        multiple
        outlined
      ></v-select>

      <v-textarea outlined name="input-7-4" v-model="content" />
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
    },
    payload: {
      type: Object,
      required: true,
    },
    exitAction: {
      type: Function,
      required: true,
    },
    updateAction: {
      type: Function,
      required: true,
    },
    saveAction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      //   show: true,
      content: "",
      title: "",
      tagValue: [],
      tagItems: [],
    };
  },
  mounted() {
    this.content = this.payload.content;
    this.title = this.payload.title;
    this.tagValue = this.payload.tagIds;
  },
  computed: {
    ...mapGetters({ tags: "ItemStore/getTags" }),
    getTags() {
      return this.tags;
    },
  },
  methods: {
    closeDialog() {
      this.exitAction();
    },
    // Save the input's of user
    saveData() {
      if (this.payload.id) {
        this.updateAction({ content: this.content, tags: this.tagValue });
      } else {
        this.saveAction({
          title: this.title,
          content: this.content,
          tagIds: this.tagValue,
        });
      }
    },
  },
};
</script>

<style>
.challenge-dialog__v-card {
  padding: 25px;
}
</style>
