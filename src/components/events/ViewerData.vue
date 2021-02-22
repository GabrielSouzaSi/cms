<template>
  <b-modal id="viewer" title="Evento" size="lg" hide-footer>
    <div class="d-block">
      <b-card
        :img-src="'http://104.248.225.49'+viewerData.imgUrl"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 100%"
      >
        <div class="text-right" style="margin-top: -15px">
          <b-badge
            v-bind:style="{
              background: viewerData.categoryColor,
              color: 'white',
            }"
          >
            <b-icon icon="tag-fill"></b-icon>
            {{ viewerData.categoryName }}
          </b-badge>
        </div>
        <b-card-title>{{ viewerData.name }}</b-card-title>

        <b-card-text>{{ viewerData.description }}</b-card-text>
        <div class="mt-5 text-center">
          <h6>
            {{ viewerData.place }}
            <b-icon-geo-alt></b-icon-geo-alt>
            <br />
            <small>{{ viewerData.address }}</small>
          </h6>
        </div>
      </b-card>
    </div>
  </b-modal>
</template>

<script>
import barramento from "@/eventBus/barramento";
export default {
  data() {
    return {
      viewerData: {
          name: '',
          description: '',
          imgUrl: '',
          place: '',
          address: '',
          categoryName: '',
          categoryColor: ''
      },
    };
  },
  created() {
    barramento.$on("viewerDataEvent", (data) => {
      this.viewerData.name = data.name;
      this.viewerData.description = data.description;
      this.viewerData.imgUrl = data.img;
      this.viewerData.place = data.place;
      this.viewerData.address = data.address;
      this.viewerData.categoryName = data.category.name;
      this.viewerData.categoryColor = data.category.color;
      this.$bvModal.show("viewer");

    });
  }
};
</script>
