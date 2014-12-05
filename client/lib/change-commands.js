

module.exports = {
	cellValue: function(id, cell, value){
		this.id = id;
		this.cell = cell;
		this.value = value;

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
	stepAdded: function(parent, step, index){
		if (index != null){
			this.apply = function(store){
				parent.insertStep(index, step);
				store.storeStep(step);
			}
		}
		else {
			this.apply = function(store){
				parent.addStep(step);
				store.storeStep(step);
			}
		}

		this.unapply = function(store){
			parent.removeStep(step);
			store.removeStep(step);
		}

		return this;
	},

	stepRemoved: function(parent, step){
		this.apply = function(store){
			this.position = parent.removeStep(step);
			store.removeStep(step);
		}

		this.unapply = function(store){
			parent.insertStep(this.position, step);
			store.storeStep(step);
		}

		return this;
	},



}