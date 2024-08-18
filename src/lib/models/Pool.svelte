<script context="module" lang="ts">
    export type Pool = {
        processId: string;
        image: string;
        name: string;
        createdBy: string;
        ticker: string;
        description: string;
        price: number;
        time: string;
        holders: number;
        buyers: number;
        marketCap: number;
        liquidty: number;
        volume: number;
        hourVolume: Volume;
        dayVolume: Volume;
        weekVolume: Volume;
        montlyVolume: Volume;
    };

    export type Volume = {
        past: number;
        now: number;
    };

</script>