<template>
    <div class="route-timeline" ref="timeline"></div>
</template>
<script>
import { Timeline } from "vis-timeline/esnext";
import { DataSet } from 'vis-data'
import 'vis-timeline/styles/vis-timeline-graph2d.css'

export default {
    props: {
        items: {
            type: Array,
            default: function () { return [] }
        },
        groups: {
            type: Array,
            default: function () { return [] }
        }
    },
    data () {
        return {
            dataItems: new DataSet(this.items),
            dataGroups: new DataSet(this.groups),
            options: {
                editable: true
            }
        }
    },
    methods: {
        getItem (id) {
            return this.dataItems.get(id)
        }
    },
    mounted () {
        this.timeline = new Timeline(this.$refs.timeline, this.dataItems, this.dataGroups, this.options)
        this.timeline.on('select', ({event, items}) => {
            console.log(this.getItem(items))
        })
    }
}
</script>

<style>
.vis-labelset .vis-label {
    border-bottom: 1px solid rgb(var(--base-1));
}
.vis-label.vis-nested-group.vis-group-level-unknown-but-gte1 {
    background: rgb(var(--neutral-2));
}
.vis-group-level-unknown-but-gte1 {
    border: 1px solid rgb(var(--base-1));
}
.vis-time-axis .vis-grid.vis-minor {
    border-color: rgb(var(--base-4));
}
.vis-time-axis .vis-grid.vis-major {
    border-color: rgb(var(--base-3));
}
.vis-foreground .vis-group {
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(var(--base-3));
}

.vis-item.vis-background {
    background-color: rgba(var(--accent-1), 0.15);
    color: rgb(var(--neutral-1));
}
.vis-item.vis-range {
    background-color: var(--functional-blue);
    color: rgb(var(--neutral-1));
    border-color: rgb(var(--base-4));
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
}
.vis-item.vis-selected {
    background-color: var(--functional-yellow);
}

.vis-timeline, .vis-panel.vis-center, .vis-panel.vis-left, .vis-panel.vis-right, .vis-panel.vis-top, .vis-panel.vis-bottom {
    border: 1px solid rgb(var(--base-1));
}
</style>