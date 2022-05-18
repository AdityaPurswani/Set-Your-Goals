const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc Set Goals
// @route SET /api/goals
// @access Private
const setGoals = asyncHandler( async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Goal text is required')
    }

    const goal = Goal.create({
        user: req.user.id,
        text: req.body.text
    })

    res.status(200).json(goal)

})

// @desc Delete Goals
// @route DELETE /api/goals/id
// @access Private
const deleteGoals = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the login user matches the goal user
    if(goal.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authenticated')
    }
    
    await goal.remove()

    res.status(200).json({id: req.params.id})
})

// @desc Update Goals
// @route PUT /api/goals/id
// @access Private
const updateGoals = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the login user matches the goal user
    if(goal.user.toString() != user.id){
        res.status(401)
        throw new Error('User not authenticated')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

module.exports = {
    getGoals,
    setGoals,
    deleteGoals,
    updateGoals
}
