'use strict';

module.exports = class TypeHierarchy {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.organizationId = data.organizationId;
      this.propositionId = data.propositionId;
      this.applicationGuid = data.applicationGuid;
      this.deviceType = data.deviceType;
      this.groupName = data.groupName;
      this.oAuthClientId = data.OAuthClientId;
    }
  }
}
