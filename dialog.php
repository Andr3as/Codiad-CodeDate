<!--
    Copyright (c) Codiad & Andr3as, distributed
    as-is and without warranty under the MIT License. 
    See [root]/license.md for more information. This information must remain intact.
-->
<form id="dateForm">
    <label><span class="icon-clock big-icon"></span>CodeDate Settings</label>
    <hr>
    <table class="settings">
        <tr>
            <td><label for="firstDate">First formatting:</label></td>
            <td><input type="text" id="firstDate"></td>
        </tr>
        <tr>
            <td><label for="secondDate">Second formatting:</label></td>
            <td><input type="text" id="secondDate"></td>
        </tr>
    </table>
    <p>More information: <a href="http://momentjs.com/docs/#/displaying/" class="linkDate" target="_blank">Moment.js</a></p>
    <button onclick="codiad.CodeDate.preview(); return false;">Preview</button>
    <script>
        codiad.CodeDate.showSettings();
    </script>
</form>