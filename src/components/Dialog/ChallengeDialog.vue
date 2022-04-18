<template>
  <v-dialog v-if="show" value="true" persistent max-width="290">
    <v-card>
      <v-row class="pop-up--header px-4">
        <v-divider class="shadow-subheader"></v-divider>
        <v-col class="pop-up--header--left" cols="8">
          <v-row class="fill-height align-center">
            <v-btn text @click="closeDialog()"> CLOSE </v-btn>

            <v-spacer class="hidden-md-and-up" />
          </v-row>
        </v-col>
        <v-col>
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
