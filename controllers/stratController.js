import { STATUS } from "../utils/constants.js"
import { NotFoundError } from "../errors/customErrors.js"
import Strat from "../models/StratModel.js"


//FIND STRAT @ STATUS PENDING

export const findStrat = async (req, res) => {
    const strat = await Strat.find({statusOptions : STATUS.PENDING})

    if (!strat) throw new NotFoundError('There are no current pending strats.')

    res.status(200).json( {strat} )
}

//find single strat
export const getStrat = async (req, res) => {
    const strat = await Strat.findById(req.params.id);
    res.status(StatusCodes.OK).json({ strat });
  };


export const approvedStrat = async (req, res) => {
    const strat = await Strat.find({statusOptions : STATUS.APPROVED})

    if (!strat) throw new NotFoundError('There are no strats.')

    res.status(200).json({ strat })
}


//Update Strat 

export const updateStrat = async (req, res) => {
 const { id } = req.params
 const updateStrat = await Strat.findByIdAndUpdate(id, {statusOptions : STATUS.APPROVED}, {
    new: true
 })
 if (!updateStrat) throw new NotFoundError(`No strat with ${id}.`)
 res.status(200).json({msg: `Job ${id} updated to status approved.`})
}

//Delete Strat 

export const deleteStrat = async (req, res) => {
    const { id } = req.params
    const removeStrat = await Strat.findByIdAndDelete(id)

    if (!removeStrat) throw new NotFoundError(`Could not find strat with ${id}.`)
    
    res.status(200).json({msg: `Job ${id} removed`})
}

//CREATE STRAT
export const createStrat = async (req, res) => {

        //Attach user id to created strat
        req.body.createdBy = req.user.userId;
        const strat = await Strat.create(req.body)

        if(!strat) throw new NotFoundError('Could not create Strat.')

        res.status(200).json({msg: 'Job Created.'})   
    
}