function CodeEditor(parent)
{
	//Parent
	if(parent === undefined)
	{
		this.parent = document.body;
	}
	else
	{
		this.parent = parent;
	}
	
	//ID
	var id = "code" + CodeEditor.id;
	CodeEditor.id++;

	//Create element
	this.element = document.createElement("div");
	this.element.id = id;
	this.element.style.position = "absolute";
	this.element.className = "container";
	
	//Codemirror editor
	this.code = new CodeMirror(this.element, {value: "//TODO <Insert Code here>\n", lineNumbers: true, mode: "javascript"});
	this.code.setOption("theme", "monokai");
	this.code.setOption("mode", "javascript");

	//Code changed event
	var self = this;
	this.code.on("change", function()
	{
		self.updateScript();
	});

	//Element atributes
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Script attached to code editor
	this.script = null;

	//Add element to document
	this.parent.appendChild(this.element);
}

//CodeEditor conter
CodeEditor.id = 0;

//Functions Prototype
CodeEditor.prototype.update = update;
CodeEditor.prototype.updateInterface = updateInterface;
CodeEditor.prototype.destroy = destroy;
CodeEditor.prototype.setMode = setMode;
CodeEditor.prototype.getText = getText;
CodeEditor.prototype.setText = setText;
CodeEditor.prototype.attachScript = attachScript;
CodeEditor.prototype.updateScript = updateScript;

//Return editor text
function getText()
{
	return this.code.getValue();
}

//Set editor text
function setText(text)
{
	this.code.setValue(text);
}

//Attach Script to code editor
function attachScript(script)
{
	this.script = script;
	this.setText(script.code);
}

//Update attached script
function updateScript()
{
	if(this.script != null)
	{
		this.script.setLoopCode(this.code.getValue());
	}
}

//Set language mode (javascript, glsl, ...)
function setMode(mode)
{
	this.code.setOption("mode", mode);
}

//Remove element
function destroy()
{
	this.parent.removeChild(this.element);
}

//Update CodeEditor
function update(){}

//Update division Size
function updateInterface()
{
	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}

	this.code.setSize(this.size.x, this.size.y);
	
	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}