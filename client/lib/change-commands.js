

module.exports = {
	cellValue: function(id, cell, value){
		this.apply = function(store){
			this.arg = store.find(id).args.find(cell);
		
			this.oldValue = this.arg.value;
			this.oldChanged = this.arg.changed;

			this.arg.value = value;
			this.arg.changed = true;
		}

		this.unapply = function(store){
			this.arg.value = this.oldValue;
			this.arg.changed = this.oldChanged;
		}

		return this;
	},

	// the following two can do sections too
	stepAdded: function(parent, step, order){

	},

	stepRemoved: function(parent, step){

	},



}