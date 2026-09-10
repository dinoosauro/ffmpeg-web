<script lang="ts"> 
    
    interface Props {
        /**
     * The text to show in the Switch
     */
        text: string;
        /**
     * If the Switch is checked or not
     */
        checked?: boolean;
        onchange: (val: boolean) => void
    }

    let { text, checked = false, onchange }: Props = $props();
</script>

<label class="flex hcenter">
    <input type="checkbox" bind:checked={checked} onchange={() => onchange(checked)} />
    {text}
</label>

<style>
    input {
        appearance: none;
        width: 70px;
        min-width: 70px;
        height: 20px;
        border-radius: 8px;
        background-color: var(--background);
        margin-right: 10px;
        position: relative;
        transition: background-color 0.2s ease-in-out;
    }
    input::before {
        position: absolute;
        top: 3px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--text);
        left: 4px;
        content: "";
        transition: 0.2s ease-in-out;
        transition-property: left background-color;
    }
    input:checked::before {
        left: 53px;
        background-color: var(--background);
    }
    input:checked {
        background-color: var(--select);
    }
    label:hover {
        cursor: pointer;
    }
</style>
