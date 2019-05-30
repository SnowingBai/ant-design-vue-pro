<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
        >
          <a-icon
            v-if="item.meta.icon"
            :type="item.meta.icon"
          />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :menu-info="item"
          :key="item.path"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu,
  },
  data () {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    return {
      collapsed: false,
      menuData,
      selectedKeys: [],
      openKeys: []
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = []
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [item.path || selectedKeys]
          const newItem = {...item}
          delete newItem.children
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          }
          menuData.push(newItem)
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuData(item.children))
        }
      })

      return menuData
    }
  }
}
</script>
