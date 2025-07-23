Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ACCOUNT_TYPE_EMAIL = "EmailAccount";
exports.ACCOUNT_TYPE_SOCIAL = "SocialAccount";
exports.ACCOUNT_TYPE_PHONE = "SmsAccount";

exports.contentTypeApiUpdateUser = "application/json";
exports.apiEndPointUpdateUser = "profile/profile";
exports.apiUpdateUserType = "PUT";

exports.urlGetValidations = "profile/validations";
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";

exports.contenttypeApiValidateMobileNo = "application/json";
exports.endPointApiValidateMobileNo = "profile/change_phone_validation";
exports.callTypeApiValidateMobileNo = "POST";

exports.endPointApiGetUserProfile = "profile/profile";
exports.contentTypeApiGetUserProfile = "application/json";
exports.methodTypeApiGetUserProfile = "GET";

// Customizable Area Start
exports.bookMarkApiType = "GET";
exports.contentTypeApiBookMark = "application/json";
exports.placeHolderEmail = "Email";
exports.labelHeader =
  "This is your profile, Here you can see and update your personal information.";
exports.labelFirstName = "First name";
exports.lastName = "Last name";
exports.labelArea = "Area";
exports.labelMobile = "Mobile";
exports.labelEmail = "Email";
exports.labelCurrentPassword = "Current password";
exports.labelNewPassword = "New Password";
exports.labelRePassword = "Re-Type Password";
exports.btnTextCancelPasswordChange = "Cancel";
exports.btnTextSaveChanges = "Save Changes";
exports.btnTextChangePassword = "Change Password";
exports.errorCountryCodeNotSelected = "Please select country code";
exports.errorMobileNoNotValid = "Phone number is not valid.";
exports.errorTitle = "Error";
exports.errorBothPasswordsNotSame = "Passwords must match.";
exports.errorCurrentNewPasswordMatch = "New password cannot match current password.";
exports.errorCurrentPasswordNotValid = "Current password not valid.";
exports.errorNewPasswordNotValid = "New password not valid.";
exports.cancelRequest = "/bx_block_request_management/self_cencel_request";
exports.errorReTypePasswordNotValid = "Re-type password not valid.";
exports.hintCountryCode = "Select Country";
exports.errorBlankField = "can't be blank";
exports.errorEmailNotValid = "Email not valid.";
exports.followersEndpoint="/bx_block_followers/follows"
exports.requestsEndPoint = '/bx_block_request_management/requests';
exports.userPostsEndpoint="/bx_block_posts/posts/another_user_posts"
exports.userBookmarkEndpoint="/bx_block_share/bookmark"
exports.draftsListEndPoint="bx_block_posts/posts/draft_posts"
exports.draftsListDeleteMethodType = 'DELETE';
exports.draftsListPutMethodType = 'PUT';
exports.draftsListDeleteEndPoint = 'bx_block_posts/posts/';
exports.draftsListUpdateEndPoint = 'bx_block_posts/posts/';
exports.shareProfileEndPoint = '/bx_block_profile/profile/share_profile';
// Customizable Area End

