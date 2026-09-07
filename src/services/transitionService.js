exports.validateTransition = (currentPosition, targetPostion)=>{
    return Math.abs(targetPostion - currentPosition) === 1
}
//Forward + 1
//Backwards -1 