---
title: Rabbit R1 Creations SDK
description: Build amazing apps for the Rabbit R1 device
---

# Rabbit R1 Creations SDK

Build, deploy, and document your Rabbit R1 apps with our comprehensive SDK and documentation platform.

## Quick Start

<div class="flex flex-col sm:flex-row gap-4 mb-8">
  <UButton to="/getting-started" size="lg" class="flex-1">
    🚀 Getting Started
  </UButton>
  <UButton to="/apps" size="lg" variant="outline" class="flex-1">
    📱 Browse Apps
  </UButton>
</div>

## What's Included

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <UCard>
    <div class="text-3xl mb-4">📚</div>
    <h3 class="text-xl font-semibold mb-2">SDK Documentation</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Complete API reference and guides for building R1 apps with hardware integration, storage, and LLM capabilities.</p>
    <UButton to="/docs" variant="link" class="p-0 h-auto">
      Read docs →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">🎮</div>
    <h3 class="text-xl font-semibold mb-2">App Gallery</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Discover and download working R1 apps. Each app includes source code, documentation, and QR codes for easy installation.</p>
    <UButton to="/apps" variant="link" class="p-0 h-auto">
      Browse apps →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">🛠️</div>
    <h3 class="text-xl font-semibold mb-2">Development Tools</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">QR code generators, build scripts, and deployment tools to streamline your R1 app development workflow.</p>
    <UButton to="/docs/building-r1-apps" variant="link" class="p-0 h-auto">
      View tools →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">🤝</div>
    <h3 class="text-xl font-semibold mb-2">Community</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Join the community of R1 developers, share your apps, and contribute to the ecosystem.</p>
    <UButton href="https://github.com/nytemode/r1-creations-sdk" target="_blank" variant="link" class="p-0 h-auto">
      Join community →
    </UButton>
  </UCard>
</div>

## 🎮 Live Apps Running on Vercel

Try out these R1 apps directly in your browser (with keyboard fallbacks for testing):

<UCard class="mb-8">
  <template #header>
    <h3 class="text-lg font-semibold">🕹️ Interactive Demos</h3>
  </template>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <UButton to="/apps/reaction-timer" variant="outline" class="justify-start">
      <span class="mr-2">🎯</span> Reaction Timer - Test reflexes with precision timing
    </UButton>
    <UButton to="/apps/r1-reaction-timer-game" variant="outline" class="justify-start">
      <span class="mr-2">⚡</span> Advanced Timer - Hardware-accelerated version
    </UButton>
    <UButton to="/apps/plugin-demo" variant="outline" class="justify-start">
      <span class="mr-2">🔧</span> Plugin Demo - SDK capabilities showcase
    </UButton>
    <UButton to="/apps/qr-demo" variant="outline" class="justify-start">
      <span class="mr-2">📱</span> QR Demo - Code generation tools
    </UButton>
  </div>

  <template #footer>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      <em>Note: Use Spacebar when testing in browser instead of R1 hardware buttons.</em>
    </p>
  </template>
</UCard>
