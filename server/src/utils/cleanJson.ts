const cleanJson = (obj: any, feilds: string[]) => {
    feilds.forEach(feild => delete obj[feild])
    return obj
}

export default cleanJson
