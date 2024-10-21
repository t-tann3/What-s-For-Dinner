import User from "../models/user.model.js";

export async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
};

export const getUserById = async (req, res) => {
    try {
        const UserDetails = req.params.id;
        const user = await User.findById(UserDetails)

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateUserById = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(updatedUser);
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const deleteUserById = async (req, res) => {
    try{
        const UserId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(UserId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error. message});
    }
};

