import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import gamesService from "../services/gameService.js";
import userService from "../services/userService.js";

const gamesController = Router();

gamesController.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const ownerId = req.user._id;

    //console.log(deviceData);

    try {
        const course = await gamesService.create(courseData, ownerId);
        // res.redirect('/courses/catalog');
        res.json(course);
    } catch (err) {
        // const errorMessage = getErrorMessage(err);
        // return res.render('course/create', { error: errorMessage, course: courseData, title: 'Create Page'});
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

gamesController.get('/catalog', async (req, res) => {
    const courses = await gamesService.getAll().lean();
    // res.render('course/catalog', { courses, title: 'Catalog Page'});
    res.json(courses);
});

gamesController.get('/details/:courseId', async (req, res) => {
    // const { course, owner, isOwner, signedUp, signUps } = await checkOwnerAndSignedUp(req, res);

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    // res.render('course/details', { course, owner, isOwner , signedUp, signUps, title: 'Details Page'});

    const course = await gamesService.getOne(req.params.courseId);

    res.json(course);
});

gamesController.get('/signUp/:courseId', isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const { course, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    if (isOwner){
        // return res.render('course/details',
        //     { error: `You are owner of ${course.title} and can not sign up for it!`, course, owner, isOwner, signedUp, signUps, title: 'Details Page'});
        // res.setError('You cannot vote for this volcano!');
        // return res.redirect('/404');
        return res.status(400).json({ message: 'You cannot like this game!' });
    }   

    if (signedUp){
        // return res.already signed render('course/details',
        //     { error: 'You\'ve up for this course!', course, owner, isOwner, signedUp, signUps, title: 'Details Page'});
        return res.status(400).json({ message: 'You have already liked this game!' });
    }

    try {        
        const signUpCourse = await gamesService.signUp(courseId, userId);
        // res.redirect(`/courses/details/${courseId}`);
        res.json(signUpCourse);
    } catch(err){ 
        res.status(400).json({ message: getErrorMessage(err) });
    }    
});

gamesController.put('/edit/:courseId', isAuth, async (req, res) => {
    const courseData = req.body;
    const courseId = req.params.courseId;

    const { course, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    if (!isOwner) {
        // return res.render('device/details',
        //     { course, isOwner: false, signedUp, signUps, error: 'You cannot edit this course!', title: 'Details Page'});
        // res.setError('You cannot delete this movie!');
        // return res.redirect('/404');
        return res.status(400).json({ message: 'You cannot edit this game!' });
    }  

    try {
        const updatedGame = await gamesService.edit(courseId, courseData);
        // res.redirect(`/courses/details/${courseId}`);
        res.json(updatedGame);
    } catch (err) {
        // const errorMessage = getErrorMessage(err);
        // return res.render('course/edit', { error: errorMessage, course: courseData, title: 'Edit Page' });
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

gamesController.delete('/delete/:courseId', isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const { course, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    // Check if owner
    if (!isOwner) {
        // return res.render('course/details',
        //     { course, owner, isOwner: false, signedUp, signUps, error: 'You cannot delete this course!', title: 'Details Page'});
        // res.setError('You cannot delete this volcano!');
        // return res.redirect('/404');
        return res.status(400).json({ message: 'You cannot delete this game!' });
    }

    try {
        await gamesService.remove(courseId);
        // res.redirect('/courses/catalog');
        res.status(204).end();
    } catch (err) {
        // console.log(err);       
        // const errorMessage = getErrorMessage(err);
        // return res.render('volcano/details', { volcano: volcano, error: err , title: 'Details'});
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

async function checkOwnerAndSignedUp(req, res) {
    const courseId = req.params.courseId;
    const userId = req.user?._id;
    let course = null;
    let owner = null;

    try {
        course = await gamesService.getOne(courseId).lean();
        owner = await userService.owner(course?.owner).lean();
    } catch (err){
        console.log(err);
        res.status(400).json({ message: getErrorMessage(err) });
    }

    //console.log(course);
    //console.log(owner);

    if (!course){
        return res.status(400).json({ message: 'Game does not exists!' });
    }

    const isOwner = course?.owner && course.owner.toString() === userId;
    const signedUp = course?.signUpList?.some(signUp => signUp._id.toString() === userId);
    const signUps = course?.signUpList?.map(signUp => signUp.email).join(', ');

    // console.log(signUps);

    return { course, owner, isOwner, signedUp, signUps};
}

export default gamesController;