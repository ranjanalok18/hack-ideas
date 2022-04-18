<template>
  <div>
    <v-col>
      <v-row>
        <v-btn depressed @click.stop="newItem()" color="primary">
          <v-icon>pencil</v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-list two-line>
        <v-list-item-group :value="items">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>
                  <v-btn @click="upVote(index)">
                    <v-icon color="grey lighten-1">👍🏻 {{ item.upVote }}</v-icon>
                  </v-btn>
                  <v-btn @click="downVote(index)">
                    <v-icon color="grey lighten-1"
                      >👎🏻 {{ item.downVote }}</v-icon
                    >
                  </v-btn>

                  <v-btn @click.stop="editItem(item, index)">Edit</v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-col>
    <challenge-dialog v-if="openEditDialog.show" v-bind="openEditDialog" />
  </div>
</template>

<script>
import ChallengeDialog from "./Dialog/ChallengeDialog";
import { mapGetters } from "vuex";

export default {
  name: "ChallengeList",
  components: {
    ChallengeDialog,
  },
  data() {
    return {
      openEditDialog: {
        show: false,
        payload: {},
        exitAction: this.closeItem,
        updateAction: this.updateItem,
        saveAction: this.saveItem,
      },
    };
  },
  computed: {
    ...mapGetters({ allItems: "ItemStore/getItems" }),
    items() {
      return this.allItems;
    },
  },
  methods: {
    editItem(item, index) {
      this.openEditDialog.show = true;
      this.openEditDialog.payload = item;
      this.openEditDialog.itemIndex = index;
    },
    closeItem() {
      this.openEditDialog.show = false;
    },
    updateItem(content) {
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/updateItemStore", {
        index: this.openEditDialog.itemIndex,
        content,
      });
    },
    upVote(id) {
      this.$store.dispatch("ItemStore/upVoteStore", { index: id });
    },
    downVote(id) {
      this.$store.dispatch("ItemStore/downVoteStore", { index: id });
    },
    newItem() {
      this.openEditDialog.show = true;
      this.openEditDialog.payload = {};
    },
    saveItem({ title, content }) {
      let newContent = {
        id: Math.random() * 1000,
        title,
        content,
        upVote: 0,
        downVote: 0,
      };
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/newItemStore", { newContent });
    },
  },
};
</script>
