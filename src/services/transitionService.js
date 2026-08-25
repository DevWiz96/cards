exports.validateTransition = (currentPosition, targetPostion)=>{
    return Math.abs(targetPosition - currentPosition) === 1
}
//Forward + 1
//Backwards -1 