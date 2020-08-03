export default {
    template: `<nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link"  @click.prevent="changePage(pages.current_page-1)"href="#">Previous</a></li>
                <li class="page-item" v-for="(i,key) in pages.total_pages" :key="i" :class="{active:pages.current_page===i}"@click.prevent="changePage(i)"><a class="page-link" href="#">{{i}}</a></li>
                <li class="page-item"><a class="page-link" @click.prevent="changePage(pages.current_page+1)" href="#">Next</a></li>
            </ul>
        </nav>`,
    props: ["pages"],
    methods: {
        changePage(num) {
            this.$emit("change", num);
        },
    },
};