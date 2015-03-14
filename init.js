/*
* Copyright (c) Codiad & Andr3as, distributed
* as-is and without warranty under the MIT License.
* See [root]/license.md for more information. This information must remain intact.
*/

(function(global, $){
    
    var codiad = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    $(function() {
        codiad.CodeDate.init();
    });

    codiad.CodeDate = {
        
        path: curpath,
        
        init: function() {
            var _this = this;
            this.loadSettings();
            $.getScript(this.path+"moment.js");
            amplify.subscribe('active.onOpen', function(path){
                _this.addKeyBindings();
            });
            amplify.subscribe('settings.dialog.save', function(){
                if ($('#dateForm').length > 0) {
                    if ($('#dateForm').length > 0) {
                    codiad.CodeDate.closeDialog();
                }
                }
            });
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Add key bindings
        //
		//////////////////////////////////////////////////////////
        addKeyBindings: function(){
            if (codiad.editor.getActive() !== null) {
                var _this = this;
                var _commandManager = codiad.editor.getActive().commands;
                //clear Interval
                window.clearInterval(this.bind);
				_commandManager.addCommand({
					name: 'CodeDate',
					bindKey: {
						"win": "Ctrl-5",
						"mac": "Command-5"
					},
					exec: function () {
						_this.insert(0);
					}
				});
				_commandManager.addCommand({
					name: 'CodeDate1',
					bindKey: {
						"win": "Ctrl-Shift-5",
						"mac": "Command-Shift-5"
					},
					exec: function () {
						_this.insert(1);
					}
				});
			}
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Show Dialog to edit settings
        //
		//////////////////////////////////////////////////////////
        showDialog: function() {
            codiad.modal.load(400, this.path+"dialog.php");
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Enter the current settings into the input fields
        //
		//////////////////////////////////////////////////////////
        showSettings: function() {
            $('#firstDate').val(this.settings[0]);
            $('#secondDate').val(this.settings[1]);
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Close settings dialog and save new settings
        //
		//////////////////////////////////////////////////////////
        closeDialog: function() {
            var first   = $('#firstDate').val();
            var second  = $('#secondDate').val();
            if (first !== "" && second !== "") {
                this.saveSettings([first, second]);
            }
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Save settings given as array in settings
        //
        //  Parameters:
        //
        //  settings - {Array} - Array of formattings
        //
		//////////////////////////////////////////////////////////
        saveSettings: function(settings) {
            var _this = this;
            settings = JSON.stringify(settings);
            $.post(this.path+"controller.php?action=saveSettings", {"settings": settings}, function(data){
                data = JSON.parse(data);
                if (data.status == "error") {
                    codiad.message.error(data.message);
                } else {
                    codiad.message.success(data.message);
                }
                _this.loadSettings();
            });
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Load setting from server
        //
		//////////////////////////////////////////////////////////
        loadSettings: function() {
            var _this = this;
            $.getJSON(this.path+"settings.json", function(data){
                _this.settings = data;
            });
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Insert date/time
        //
        //  Parameters:
        //
        //  number - {Integer} - Index of formatting in settings array
        //
        //////////////////////////////////////////////////////////
        insert: function(number) {
            var dateStr = this.parse(this.settings[number]);
            codiad.editor.insertText(dateStr);
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Parse current date/time by given formatting
        //
        //  Parameters:
        //
        //  string - {String} - date/time format
        //
        //////////////////////////////////////////////////////////
        parse: function(string) {
            return moment().format(string);
        },
        
        //////////////////////////////////////////////////////////
        //
        //  Show a preview for given formats
        //
        //////////////////////////////////////////////////////////
        preview: function() {
            var first   = $('#firstDate').val();
            var second  = $('#secondDate').val();
            first       = this.parse(first);
            second      = this.parse(second);
            alert("1: "+first+"\n2: "+second);
        }
    };
})(this, jQuery);