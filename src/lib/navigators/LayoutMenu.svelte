<script lang="ts">
  import { type DrawerSettings, drawerStore, popup, modeCurrent, setModeCurrent } from "@skeletonlabs/skeleton";
  import { layout, storeTheme } from '../../packages/tutors-reader-lib/src/stores/stores';
	import { Icon } from '../../packages/tutors-ui';

  function applyInitialLayout() {
    layout.set("expanded");
  }

  function toggleLayout() {
    if ($layout === "compacted") {
      layout.set("expanded");
    } else {
      layout.set("compacted");
    }
  }
  
  applyInitialLayout();
</script>

<div class="relative">
  <button class="btn btn-sm" use:popup="{{ event: 'click', target: 'design' }}">
    <Icon type="dark" />
    <span class="hidden text-sm font-bold lg:block">Layout <span class="pl-2 opacity-50">▾</span></span>
  </button>
  <nav class="list-nav card card-body p-4 w-56 space-y-4 shadow-lg" data-popup="design">
    <h6>Toggles</h6>
    <ul>
      <li class="option !p-0">
        <button class="btn w-full flex justify-between" on:click="{setModeCurrent(!$modeCurrent)}">
          <span class="flex-none">Dark Mode</span>
          {#if $modeCurrent}
          <Icon icon="fluent:weather-moon-48-filled" color="rgba(var(--color-warning-500))" />
          {:else}
            <Icon icon="fluent:weather-sunny-32-filled" color="rgba(var(--color-warning-500))" />
          {/if}
        </button>
      </li>
      <li class="option !p-0" on:click="{() => toggleLayout()}">
        <button class="btn w-full flex justify-between">
          <span class="flex-none">Compact</span>
          <Icon type="{$layout}" />
        </button>
      </li>
    </ul>
    <hr />
    <h6>Themes</h6>
    <ul class="list">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        class="option !p-0"
        on:click="{() => {
          storeTheme.set('tutors');
        }}"
      >
      <button class="btn w-full flex justify-between" class:!variant-soft-primary="{$storeTheme === 'tutors'}">
        <span class="flex-none">Tutors</span>
      </button>
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        class="option !p-0"
        on:click="{() => {
          storeTheme.set('dyslexia');
        }}"
      >
      <button class="btn w-full flex justify-between" class:!variant-soft-primary="{$storeTheme === 'dyslexia'}">
        <span class="flex-none">Dyslexia</span>
      </button>
      </li>
    </ul>
  </nav>
</div>
