const updateObject = (object, modifiedProperties) => {
    const updatedObject = {
        ...object,
        ...modifiedProperties
    }
    return updatedObject;
}

export default updateObject;