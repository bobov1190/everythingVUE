const app = Vue.createApp({
  data() {
    return {
      message: "Hello Vue!",
      age: 17,
      logged: false,
      x: 0,
      y: 0,
      books: [
        {
          title: "Harry Potter",
          author: "J. K. Rowling",
          img: "https://picsum.photos/200",
          isFav: true,
        },
        {
          title: "7Gnomos",
          author: "H. G. Rodadad",
          img: "https://picsum.photos/201",
          isFav: true,
        },
        {
          title: "Princessa",
          author: "A. S. By",
          img: "https://picsum.photos/202",
          isFav: false,
        },
      ],
      filtered: false,
      url: "https://google.com",
    };
  },
  methods: {
    changeMessage(msg) {
      this.message = msg;
    },
    handleEvent(e, num) {
      console.log(e, e.type);
      if (num) {
        console.log(num);
      }
    },
    handleMouseMove(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    toggleFav(book) {
      book.isFav = !book.isFav;
    },
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => book.isFav);
    },
  },
});

app.mount("#app");
