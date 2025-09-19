<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900 dark:text-white">
              R1 Creations SDK
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/apps" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Apps
            </NuxtLink>
            <NuxtLink to="/docs" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Docs
            </NuxtLink>
            <NuxtLink to="/getting-started" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Getting Started
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Rabbit R1 Creations SDK. Built for the Rabbit R1 device.</p>
          <p class="mt-2">
            <NuxtLink to="https://github.com/nytemode/r1-creations-sdk" class="hover:text-gray-900 dark:hover:text-white">
              View on GitHub
            </NuxtLink>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Add dark mode toggle functionality
const colorMode = useColorMode()

// Add to head for SEO
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
