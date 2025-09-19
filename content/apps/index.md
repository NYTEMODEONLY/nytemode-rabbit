---
title: R1 App Gallery
description: Discover and download working Rabbit R1 apps
---

# R1 App Gallery

Browse our collection of working Rabbit R1 applications. Each app includes source code, documentation, and QR codes for easy installation on your R1 device.

## Featured Apps

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <UCard>
    <div class="text-3xl mb-4">⏱️</div>
    <h3 class="text-xl font-semibold mb-2">Reaction Timer</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Test your reflexes with precision timing. Features millisecond accuracy, best time tracking, and hardware button integration.</p>
    <UButton to="/apps/reaction-timer" variant="link" class="p-0 h-auto">
      Learn more →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">⚡</div>
    <h3 class="text-xl font-semibold mb-2">Advanced Reaction Timer</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Hardware-accelerated reaction timer built with modern web technologies. Includes state machines and optimized performance.</p>
    <UButton to="/apps/r1-reaction-timer-game" variant="link" class="p-0 h-auto">
      Learn more →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">🔧</div>
    <h3 class="text-xl font-semibold mb-2">Plugin Demo</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Complete demonstration of R1 SDK capabilities including hardware controls, LLM integration, and persistent storage.</p>
    <UButton to="/apps/plugin-demo" variant="link" class="p-0 h-auto">
      Learn more →
    </UButton>
  </UCard>

  <UCard>
    <div class="text-3xl mb-4">📱</div>
    <h3 class="text-xl font-semibold mb-2">QR Demo</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">QR code generation and testing tools. Learn how to create proper QR codes for R1 app distribution.</p>
    <UButton to="/apps/qr-demo" variant="link" class="p-0 h-auto">
      Learn more →
    </UButton>
  </UCard>
</div>

## 🎮 Try Apps Live

All apps are hosted on Vercel and can be tested directly in your browser:

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

## 📥 Download to R1 Device

Each app page includes QR codes that you can scan directly with your R1 device to install and run the app. The QR codes contain properly formatted JSON manifests that the R1 device expects for installation.
