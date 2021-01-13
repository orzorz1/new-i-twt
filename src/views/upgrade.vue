<template>
  <v-container>
    <v-card tile flat style="width: 80%; position: relative; margin: 0 auto">
      <v-card-title>账号升级</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-select
          :items="items"
          v-model="select"
          label="目标账号类型"
          outlined
        ></v-select>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { upgradeOption } from "@/api/user";

export default {
  name: "upgrade",
  data: () => ({
    options: [],
    select: "",
  }),
  methods: {
    submit() {},
  },
  created: () => {
    upgradeOption().then((value) => {
      console.log(value);
      this.options = value;
    });
  },
};
</script>