
export const checkArray=(element)=>{
    if(element && Array.isArray(element) && element.length)
        return true;
    return false;
}

export const delay = ms => new Promise(res => setTimeout(res, ms));