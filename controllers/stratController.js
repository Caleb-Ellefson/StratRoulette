import { NotFoundError } from "../errors/customErrors.js"
import Strat from "../models/StratModel.js"

export const createStrat = async (req, res) => {
        const { stratDescription, stratName, Team } = req.body
        const strat = await Strat.create({ stratDescription, stratName, Team})
        res.status(201).json({ strat })
    
}

export const getStrat = async (req, res ) => {
    res.send("hello, world")
}