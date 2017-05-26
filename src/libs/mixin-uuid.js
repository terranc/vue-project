export default {
  created () {
    if (!this._uuid) {
      this._uuid = Math.random().toString(36).substring(3, 8);
    }
  },
};
