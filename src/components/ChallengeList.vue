<template>
  <div>
    <v-col>
      <v-row>
        <v-col cols="8">
          <v-btn depressed @click.stop="newItem()" color="primary">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4" class="d-flex">
          <v-spacer />
          Up Vote
          <v-btn
            icon
            @click="sortDirection('ASC')"
            :color="sortBy == 'ASC' ? 'green' : ''"
          >
            <v-icon>mdi-arrow-down-bold-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="sortDirection('DESC')"
            :color="sortBy == 'DESC' ? 'green' : ''"
          >
            <v-icon>mdi-arrow-up-bold-outline</v-icon>
          </v-btn>
          Date
          <v-btn
            icon
            @click="sortDateDirection('ASC')"
            :color="sortDate == 'ASC' ? 'green' : ''"
          >
            <v-icon>mdi-arrow-down-bold-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="sortDateDirection('DESC')"
            :color="sortDate == 'DESC' ? 'green' : ''"
          >
            <v-icon>mdi-arrow-up-bold-outline</v-icon>
          </v-btn></v-col
        >
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
                  <v-btn icon @click="upVote(index)">
                    <v-icon :color="item.upVoted ? 'green' : ''"
                      >mdi-thumb-up-outline </v-icon
                    >{{ item.upVote.length }}
                  </v-btn>
                  <v-btn icon @click="downVote(index)">
                    <v-icon :color="item.downVoted ? 'green' : ''"
                      >mdi-thumb-down-outline </v-icon
                    >{{ item.downVote.length }}
                  </v-btn>

                  <v-btn @click.stop="editItem(item, index)"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
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
      let selectedTag = this.tags.filter((item) => {
        // item.id == ids;
        return ids.includes(item.id);
      });
      return selectedTag.map((t) => {
        return t.tagName;
      });
    },
    // To Show the edit Dialog
    editItem(item, index) {
      this.openEditDialog.show = true;
      this.openEditDialog.payload = item;
      this.openEditDialog.itemIndex = index;
    },
    closeItem() {
      this.openEditDialog.show = false;
    },
    // User Update of the item
    updateItem(payload) {
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/updateItemStore", {
        index: this.openEditDialog.itemIndex,
        content: payload.content,
        tags: payload.tags,
      });
    },
    // Cast the Up Vote
    upVote(id) {
      this.$store.dispatch("ItemStore/upVoteStore", {
        index: id,
        empId: localStorage.getItem("employeeId"),
      });
    },
    // Cast the Down Vote
    downVote(id) {
      this.$store.dispatch("ItemStore/downVoteStore", {
        index: id,
        empId: localStorage.getItem("employeeId"),
      });
    },
    newItem() {
      this.openEditDialog.show = true;
      this.openEditDialog.payload = {};
    },
    // To save the newly created item
    saveItem({ title, content, tagIds }) {
      let newContent = {
        id: Math.random() * 1000,
        tagIds,
        title,
        content,
        upVote: [],
        downVote: [],
        createdDate: new Date(),
        empId: this.empId,
        upVoted: false,
        downVoted: false,
      };
      this.openEditDialog.show = false;
      this.$store.dispatch("ItemStore/newItemStore", { newContent });
    },
    // Sorting based on the Up Vote
    sortDirection(payload) {
      this.sortBy = payload;
      this.sortDate = "";
      this.$store.dispatch("ItemStore/sortBy", this.sortBy);
    },
    // Sorting based on the Created Date
    sortDateDirection(payload) {
      this.sortDate = payload;
      this.sortBy = "";
      this.$store.dispatch("ItemStore/sortDate", this.sortDate);
    },
  },
};
</script>
