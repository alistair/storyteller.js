function ChangeCell(id, cell, value){
	this.id = id;
	this.cell = cell;
	this.value = value;
}

ChangeCell.prototype.apply = function(store){

}

ChangeCell.prototype.unapply = function(store){
	
}

module.exports = {
	changeCell: ChangeCell
}