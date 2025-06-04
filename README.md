# Pet-Woofer
A web app for local animal organizations to communicate internally and publicly

## Authentication & User Management

### Sign Up a User
Creates a new user account for volunteers, shelter staff, or public users and logs them in.

- [ ] New user exists in the database after request
- [ ] Successful response includes newly created `id`, `firstName`, `lastName`, `email`, `role`
- [ ] If user is shelter_staff, must include valid `shelterId` in request
- [ ] Error response with status 500 is given when the specified email already exists
- [ ] Error response with status 400 is given when body validations for the `email`, `firstName`, `lastName`, or `phone` are violated
- [ ] Error response with status 403 when trying to create shelter_staff without valid shelter invitation

### Sign Up a Shelter
Creates a new shelter organization and initial admin user.

- [ ] New shelter exists in the database after request
- [ ] New user with shelter_staff role and manager permissions created
- [ ] Successful response includes shelter `id`, `name`, `address`, and admin user details
- [ ] Error response with status 400 for validation errors
- [ ] Error response with status 500 if shelter name already exists

### Log In a User
Logs in a user with valid credentials and returns their information.

- [ ] Successful response includes the user's `id`, `firstName`, `lastName`, `email`, `role`
- [ ] If user is shelter_staff, include `shelterId` and `shelterName`
- [ ] Error response with status 401 is given when invalid credentials are given
- [ ] Error response with status 400 is given when body validations for the `email` or `password` are violated

### Get the Current User
Returns the information about the current logged-in user.

- [ ] An authenticated user is required for a successful response
- [ ] Successful response includes the user's `id`, `firstName`, `lastName`, `email`, `role`, and `phone`
- [ ] If user is shelter_staff, include shelter details and permissions
- [ ] If user is a volunteer, include volunteer profile data

## Adoptable Pets

### Get all Adoptable Pets
Returns all pets available for adoption across all shelters.

- [ ] Seed data exists in the database for adoptable pets to be returned
- [ ] Successful response includes each adoptable pet in the database
- [ ] Pet data returned includes `id`, `name`, `species`, `breed`, `age`, `gender`, `size`, `adoptionFee`, `status`, `shelterId`, `shelterName`, and `previewImage`
- [ ] Only pets with status "available" are returned
- [ ] Can filter by shelter_id query parameter

### Get Adoptable Pets by Shelter
Returns all pets for a specific shelter.

- [ ] Successful response includes only pets from the specified shelter
- [ ] Include all pet statuses for shelter staff viewing their own shelter
- [ ] Only show "available" pets for public users
- [ ] Error response with status 404 if shelter doesn't exist

### Create an Adoptable Pet
Creates and returns a new adoptable pet listing.

- [ ] An authenticated user with role "shelter_staff" is required
- [ ] User must have permissions for the shelter they're adding pet to
- [ ] New pet exists in the database after request with correct shelter_id
- [ ] Pet data returned includes all fields from adoptable_pets table
- [ ] Error response with status 403 if user doesn't have permission for this shelter
- [ ] Error response with status 400 when body validations for required fields are violated

### Add Images to an Adoptable Pet
Upload and attach images to a pet listing.

- [ ] An authenticated shelter_staff member is required
- [ ] Only staff from the pet's shelter can add images
- [ ] New image exists in the database after request
- [ ] Image data returned includes `id`, `url`, `isPrimary`, and `caption`
- [ ] Error response with status 404 when a pet does not exist
- [ ] Error response with status 403 when user is not from pet's shelter

### Edit an Adoptable Pet
Updates an existing pet listing.

- [ ] An authenticated shelter_staff member is required
- [ ] Only staff from the pet's shelter can edit
- [ ] Pet record is updated in the database
- [ ] Updated pet data returned
- [ ] Error response with status 403 if user is not from pet's shelter
- [ ] Error response with status 404 if pet doesn't exist

### Delete an Adoptable Pet
Removes a pet listing.

- [ ] An authenticated shelter_staff member is required
- [ ] Only staff from the pet's shelter can delete
- [ ] Pet and associated images removed from database
- [ ] Success message returned
- [ ] Error response with status 403 if user is not from pet's shelter

## Lost Pets

### Get all Lost Pets
Returns all reported lost pets.

- [ ] Successful response includes all lost pets in the database
- [ ] Pet data returned includes `id`, `petName`, `species`, `breed`, `lastSeenLocation`, `lastSeenDate`, `status`, `reporterName`, and `previewImage`
- [ ] Results can be filtered by status (lost, found, reunited)

### Report a Lost Pet
Creates a new lost pet report.

- [ ] Public users can create reports without authentication
- [ ] New lost pet record exists in the database after request
- [ ] Report data returned includes all fields from lost_pets table
- [ ] Error response with status 400 when required fields are missing

### Update Lost Pet Status
Update the status of a lost pet report.

- [ ] Reporter email verification required
- [ ] Status can be updated to "found" or "reunited"
- [ ] Updated record reflected in database
- [ ] Success response includes updated pet data
- [ ] Error response with status 403 if not the original reporter

## Events

### Get all Events
Returns all upcoming events and meetings.

- [ ] Successful response includes all active events
- [ ] Event data returned includes `id`, `title`, `eventType`, `startDatetime`, `location`, `shelterName`, `maxAttendees`, `currentAttendees`
- [ ] Can filter by shelter_id
- [ ] Past events are filtered out by default

### Create an Event
Creates a new event or meeting.

- [ ] An authenticated user with role "shelter_staff" or "admin" is required
- [ ] Shelter staff can only create events for their shelter
- [ ] New event exists in the database after request
- [ ] Event data returned includes all fields from events table
- [ ] Error response with status 403 if shelter staff tries to create event for different shelter

### Register for an Event
Register a user or volunteer for an event.

- [ ] An authenticated user is required for a successful response
- [ ] New registration exists in the database after request
- [ ] Updates currentAttendees count for the event
- [ ] Error response with status 400 is given when event is full
- [ ] Error response with status 403 is given when user is already registered

### Delete Event Registration
Cancel an event registration.

- [ ] An authenticated user is required
- [ ] Only the registered user can cancel their registration
- [ ] Registration record removed from database
- [ ] Decrements currentAttendees count
- [ ] Error response with status 400 if event has already occurred

## Alerts

### Get all Alerts
Returns active alerts based on user role and shelter.

- [ ] Filters alerts by target_audience based on current user's role
- [ ] Shelter staff see both system-wide and shelter-specific alerts
- [ ] Alert data returned includes `id`, `alertType`, `title`, `message`, `severity`, and `expiresAt`
- [ ] Only returns alerts that haven't expired

### Create an Alert
Creates a new alert for users.

- [ ] An authenticated user with role "shelter_staff" or "admin" is required
- [ ] Shelter staff can create alerts for their shelter only
- [ ] Admin can create system-wide alerts
- [ ] New alert exists in the database after request
- [ ] Sends notifications to targeted users based on audience selection
- [ ] Error response with status 403 if shelter staff tries to create system-wide alert

## Volunteers

### Get Volunteer Profile
Returns detailed volunteer information.

- [ ] An authenticated user is required
- [ ] Returns volunteer data including `skills`, `availability`, `preferredShelters`, and `totalHours`
- [ ] Includes volunteer hours broken down by shelter
- [ ] Error response with status 404 if user is not a volunteer

### Log Volunteer Hours
Records volunteer service hours.

- [ ] An authenticated volunteer is required
- [ ] Must specify which shelter the hours were for
- [ ] New volunteer hours record exists in the database
- [ ] Hours data returned includes `date`, `hours`, `shelterId`, `activityType`
- [ ] Error response with status 400 for invalid date or hours
- [ ] Error response with status 404 if shelter doesn't exist

### Verify Volunteer Hours
Shelter staff verifies volunteer hours.

- [ ] An authenticated shelter_staff member is required
- [ ] Can only verify hours for their own shelter
- [ ] Updates verification status and verifier info
- [ ] Error response with status 403 if not from the same shelter

## Shelters

### Get all Shelters
Returns all participating shelters.

- [ ] Successful response includes all active shelters in the database
- [ ] Shelter data returned includes `id`, `name`, `address`, `city`, `state`, `phone`, `website`, and `logoUrl`
- [ ] Include pet count for each shelter

### Get Shelter Details
Returns detailed information for a specific shelter.

- [ ] Successful response includes complete shelter information
- [ ] Returns count of available pets
- [ ] Returns recent events for this shelter
- [ ] Public users see limited info, shelter_staff see full details
- [ ] Error response with status 404 when shelter doesn't exist

### Create Shelter Staff Account
Add a new staff member to a shelter.

- [ ] An authenticated shelter_staff with manager permissions required
- [ ] New user created with shelter_staff role
- [ ] User linked to correct shelter_id
- [ ] Shelter permissions record created
- [ ] Email invitation sent to new staff member
- [ ] Error response with status 403 if not a manager

## Messages

### Send a Message
Send a private message between users.

- [ ] An authenticated user is required
- [ ] New message exists in the database after request
- [ ] Message data returned includes `id`, `subject`, `body`, `senderId`, and `recipientId`
- [ ] Shelter staff can message anyone
- [ ] Public users can only message shelters
- [ ] Error response with status 404 when recipient doesn't exist

### Get User Messages
Returns all messages for the current user.

- [ ] An authenticated user is required
- [ ] Returns both sent and received messages
- [ ] Message data includes sender and recipient user details
- [ ] Marks messages as read when retrieved

## Adoption Applications

### Submit Adoption Application
Submit an application for a specific pet.

- [ ] An authenticated user is required
- [ ] New application exists in the database
- [ ] Application data returned includes `id`, `petId`, `shelterId`, `status`
- [ ] Notification sent to shelter staff
- [ ] Error response with status 403 if pet is not available
- [ ] Error response with status 403 if user already has pending application for this pet

### Review Adoption Application
Shelter staff reviews an adoption application.

- [ ] An authenticated shelter_staff member is required
- [ ] Can only review applications for pets at their shelter
- [ ] Updates application status and review notes
- [ ] Sends notification to applicant
- [ ] Error response with status 403 if not from pet's shelter

### Get Shelter Applications
Returns all applications for a shelter's pets.

- [ ] An authenticated shelter_staff member is required
- [ ] Returns only applications for user's shelter
- [ ] Can filter by status and date range
- [ ] Include applicant and pet details

### Get My Applications
Returns all applications for the current user.

- [ ] An authenticated user is required
- [ ] Returns only applications created by current user
- [ ] Includes pet and shelter details
- [ ] Shows application status and review notes if available
