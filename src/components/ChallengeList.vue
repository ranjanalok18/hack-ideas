<template>
  <div>
    <v-col>
      <v-row>
        <v-btn depressed @click.stop="newItem()" color="primary">
          <v-icon>pencil</v-icon>
        </v-btn>
        Up Vote
        <v-btn @click="sortDirection('ASC')">
          <v-icon>⬇️</v-icon>
        </v-btn>
        <v-btn @click="sortDirection('DESC')">
          <v-icon>⬆️</v-icon>
        </v-btn>
        Date
        <v-btn @click="sortDateDirection('ASC')">
          <v-icon>⬇️</v-icon>
        </v-btn>
        <v-btn @click="sortDateDirection('DESC')">
          <v-icon>⬆️</v-icon>
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
                  <v-list-item-subtitle>
                    <v-chip-group active-class="primary--text" column>
                      <v-chip v-for="tag in getTagName(item.tagIds)" :key="tag">
                        {{ tag }}
                      </v-chip>
                    </v-chip-group></v-list-item-subtitle
                  >
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
      filterTag: [],
      sortBy: "",
      sortDate: "",
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
    ...mapGetters({
      allItems: "ItemStore/getItems",
      tags: "ItemStore/getTags",
    }),
    items() {
      return this.allItems;
    },
  },
  methods: {
    getTagName(ids) {
      console.log(
        "🚀 ~ file: ChallengeList.vue ~ line 81 ~ getTagName ~ id",
        ids
      );
      let selectedTag = this.tags.filter((item) => {
        // item.id == ids;
        return ids.includes(item.id);
      });
      console.log(selectedTag);
      return selectedTag.map((t) => {
        return t.tagName;
      });
    },
    editItem(item, index) {
      this.openEditDialog.show = true;
      this.openEditDialog.payload = item;
      this.openEditDialog.itemIndex = index;
    },
    closeItem() {
      this.openEditDialog.show = false;
    },
    updateItem(payload) {
      console.log(
        "🚀 ~ file: ChallengeList.vue ~ line 120 ~ updateItem ~ payload",
        payload
      );
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/updateItemStore", {
        index: this.openEditDialog.itemIndex,
        content: payload.content,
        tags: payload.tags,
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
    saveItem({ title, content, tagIds }) {
      let newContent = {
        id: Math.random() * 1000,
        tagIds,
        title,
        content,
        upVote: 0,
        downVote: 0,
        createdDate: new Date(),
      };
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/newItemStore", { newContent });
    },
    sortDirection(payload) {
      this.sortBy = payload;
      this.$store.dispatch("ItemStore/sortBy", this.sortBy);
    },
    sortDateDirection(payload) {
      this.sortDate = payload;
      this.$store.dispatch("ItemStore/sortDate", this.sortDate);
    },
  },
};
</script>
