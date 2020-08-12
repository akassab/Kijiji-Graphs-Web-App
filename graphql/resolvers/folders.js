const { AuthenticationError, UserInputError } = require("apollo-server");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        async createFolder(
            _,
            { folderName},
            context
        ) {
            const user = checkAuth(context);
            if (folderName.trim() === '') {
                throw new UserInputError('Empty folder name', {
                    errors: {
                        body: 'folder name must not empty'
                    }
                });
            }
            const backEndUser = await User.findById(user.id);
            if (backEndUser) {
                if (backEndUser.folders.length == 10) {
                    return backEndUser;
                }
                if (backEndUser.folders.length) {
                    for (var folder of backEndUser.folders) {
                        if (folder.name == folderName) {
                            return backEndUser;
                        }
                    }
                    backEndUser.folders.unshift({
                        name: folderName
                    });
                    await backEndUser.save()
                    return backEndUser
                }
                else {
                    backEndUser.folders.unshift({
                        name: folderName
                    });
                    await backEndUser.save()
                    return backEndUser
                }
            }
            else throw new UserInputError('User not found');
        },

    },
};
