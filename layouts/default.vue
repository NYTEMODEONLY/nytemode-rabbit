<template>
  <div>
    <!-- Header -->
    <UHeader>
      <template #logo>
        <h3 class="text-lg font-bold">
          🐰 R1 Creations SDK
        </h3>
      </template>

      <template #links>
        <UHeaderLinks
          :links="[
            { label: 'Home', to: '/' },
            { label: 'Apps', to: '/apps' },
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'Docs', to: '/docs' }
          ]"
        />
      </template>
    </UHeader>

    <!-- Main Content -->
    <UMain>
      <ContentDoc />
    </UMain>

    <!-- Footer -->
    <UFooter>
      <template #links>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Apps</h4>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/apps/reaction-timer" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Reaction Timer</NuxtLink></li>
              <li><NuxtLink to="/apps/r1-reaction-timer-game" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Advanced Timer</NuxtLink></li>
              <li><NuxtLink to="/apps/plugin-demo" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Plugin Demo</NuxtLink></li>
              <li><NuxtLink to="/apps/qr-demo" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">QR Demo</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Documentation</h4>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/getting-started" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Getting Started</NuxtLink></li>
              <li><NuxtLink to="/docs" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">API Reference</NuxtLink></li>
              <li><NuxtLink to="/docs/building-r1-apps" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Building Apps</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Community</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="https://github.com/nytemode/r1-creations-sdk" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a></li>
              <li><a href="https://nyterabbit.vercel.app" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Live Site</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">About</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Build amazing apps for the Rabbit R1 device with our comprehensive SDK and documentation platform.
            </p>
          </div>
        </div>
      </template>

      <template #copyright>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © 2025 Rabbit R1 Creations SDK. Built for the Rabbit R1 device.
        </p>
      </template>
    </UFooter>
  </div>
</template>
