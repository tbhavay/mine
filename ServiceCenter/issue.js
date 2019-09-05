const database = require('./../databaseHandler');

class Issue {
   /**
    * _issueId
    * @param issueId
    */
   constructor(issueId) {
      issueId = typeof (issueId) !== 'undefined' && issueId > 0 ? issueId : false;
      if (issueId) {
         this._issueId = issueId;
      }
   }

   /**
    * Method to create the new issues.
    * @param issueDetails: The Issue Details.
    * @param issueType: Either 'Operational' OR 'Cosmetic'
    * @returns {Promise<>}
    */
   createIssue(issueDetails, issueType) {
      return new Promise((resolve, reject) => {
         const query = "INSERT INTO service_issue_master (issue_details, issue_type, created) " +
            "VALUES ('" + issueDetails + "','" + issueType + "','NOW()')";
         database.query(query, (err, result) => {
            if (err) {
               console.error(err);
               reject(err);
            } else {
               this._issueId = result.insertId;
               resolve(result.insertId);
            }
         });
      });
   }

   /**
    * Method to get the Issues either by Issue id or all.
    * @returns {Promise<>}
    */
   getIssues() {
      return new Promise((resolve, reject) => {
         let query = "SELECT * FROM service_issue_master";
         if (this._issueId) {
            query += " WHERE id = " + this._issueId;
         }
         database.query(query, (err, result) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
               resolve(result);
            }
         });
      });
   }

   /**
    * Method to update Existing Issues details.
    * @param issueDetails: The new issue details to be updated.
    * @param issueType: The new Issue type.
    */
   updateIssue(issueDetails, issueType) {
      return new Promise((resolve, reject) => {
         let query = "UPDATE service_issue_master SET issue_details = '" + issueDetails + "'";
         if (issueType) {
            query += ", issue_type='" + issueType + "'";
         }
         query += " WHERE id= " + this._issueId;
         database.query(query, (err, result) => {
            if (err) {
               console.error(err);
               reject(err);
            } else {
               resolve(true);
            }
         });
      });
   }
}

/**
 * Exporting the class.
 * @type {Issue}
 */
module.exports = Issue;