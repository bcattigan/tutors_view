<script lang="ts">
  import type { Topic } from "../../../../tutors-reader-lib/src/models/topic";
  import { Icon } from "../../..";
  import { convertMd } from "../../../../tutors-reader-lib/src/utils/markdown-utils";

  export let topic: Topic;

  let orderedLos = topic.toc.filter((lo) => lo?.frontMatter?.order);
  let unOrderedLos = topic.toc.filter((lo) => !lo?.frontMatter?.order);
  orderedLos.sort((a, b) => Number(a.frontMatter.order) - Number(b.frontMatter.order));
  orderedLos.push(...unOrderedLos);
  topic.toc = orderedLos;
</script>

{#each topic.toc as aLo}
  <a href="{aLo.route}" class="flex py-1">
    <Icon type="{aLo.type}" />
    <span class="ml-2 mb-1"> {@html convertMd(aLo.title, "")} </span>
    {#if aLo.video && aLo.type != "panelvideo"}
      <a class="flex pl-1" href="{aLo.video}">
        <Icon type="video" />
      </a>
    {/if}
  </a>
  {#if aLo.type != "lab"}
    {#if aLo.los}
      {#each aLo.los as bLo}
        <div class="flex py-1">
          <a class="inline-flex pl-6" href="{bLo.route}">
            <Icon type="{bLo.type}" /> <span class="pl-2"> {@html convertMd(bLo.title, "")} </span>
          </a>
          {#if bLo.video && bLo.type != "panelvideo"}
            <a class="inline-flex pl-2" href="{bLo.video}">
              <Icon type="video" />
            </a>
          {/if}
        </div>
      {/each}
    {/if}
  {/if}
{/each}
