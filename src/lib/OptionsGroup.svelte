<script lang="ts">

    // Container to wrap UI "cards"

    interface Props {
        children: any,
        title: string,
        description: string,
    }

    let {children, title, description}: Props = $props();

</script>

<section class="p-4 lg:p-6 xl:p-8 flex flex-col gap-y-3 bg-base-200 rounded-2xl border border-base-100 min-w-80 flex-1">
    <h3 class="text-xl font-bold"> {title} </h3>
    <p class="text-base-content/80"> {description} </p>
    {@render children()}
</section>