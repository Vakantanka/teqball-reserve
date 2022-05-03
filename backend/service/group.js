const Group = require("../model/Group");

const getGroupByData = async (option) => {
  try {
    const existingGroup = await Group.find(option);
    return existingGroup;
  } catch (error) {
    console.log(`Could not fetch group ${error}`)
  }
}

const saveGroup = async (groupdata) => {
  try {
    const group = new Group(groupdata);
    const newGroup = await group.save();  
    return newGroup;
  } catch (error) {
    console.log(`Could not save group ${error}`)
  }
}

module.exports = { getGroupByData, saveGroup }