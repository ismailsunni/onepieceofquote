import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Quote from '@/views/Quote.vue'
import Browse from '@/views/Browse.vue'
import Search from '@/views/Search.vue'
import Character from '@/views/Character.vue'
import Tag from '@/views/Tag.vue'
import About from '@/views/About.vue'
import SubmitQuote from '@/views/SubmitQuote.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'One Piece of Quote - Inspirational Quotes from One Piece'
    }
  },
  {
    path: '/quote/:id',
    name: 'Quote',
    component: Quote,
    meta: {
      title: 'Quote - One Piece of Quote'
    }
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse,
    meta: {
      title: 'Browse All Quotes - One Piece of Quote'
    }
  },
  {
    path: '/search/:query?',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Search Quotes - One Piece of Quote'
    }
  },
  {
    path: '/character/:slug',
    name: 'Character',
    component: Character,
    meta: {
      title: 'Character Quotes - One Piece of Quote'
    }
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: Tag,
    meta: {
      title: 'Tag Quotes - One Piece of Quote'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About - One Piece of Quote'
    }
  },
  {
    path: '/submit',
    name: 'SubmitQuote',
    component: SubmitQuote,
    meta: {
      title: 'Submit a Quote - One Piece of Quote'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - One Piece of Quote'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'One Piece of Quote'
  next()
})

export default router
