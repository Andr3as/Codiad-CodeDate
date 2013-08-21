<!--
    Copyright (c) Codiad & Andr3as, distributed
    as-is and without warranty under the MIT License. 
    See [root]/license.md for more information. This information must remain intact.
-->
<form id="dateForm">
    <label for="firstDate">First formatting:</label><input type="text" id="firstDate">
    <label for="secondDate">Second formatting:</label><input type="text" id="secondDate">
    <p>More information: <a href="http://momentjs.com/docs/#/displaying/" class="linkDate" target="_blank">Moment.js</a></p>
    <button onclick="codiad.modal.unload(); return false;">Close</button>
    <button onclick="codiad.CodeDate.closeDialog(); return false;">Save</button>
    <script>
        codiad.CodeDate.showSettings();
    </script>
</form>