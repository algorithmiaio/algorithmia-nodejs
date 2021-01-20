class Algorithm {
  id: string;
  name: string;
  details: Details;
  settings: Settings;
  version_info: VersionInfo;
  source: Source;
  compilation: Compilation;
  build: Build;
  self_link: string;
  resource_type: string;

  constructor(
    id: string,
    name: string,
    details: Details,
    settings: Settings,
    version_info: VersionInfo,
    source: Source,
    compilation: Compilation,
    build: Build,
    self_link: string,
    resource_type: string
  ) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.settings = settings;
    this.version_info = version_info;
    this.source = source;
    this.compilation = compilation;
    this.build = build;
    this.self_link = self_link;
    this.resource_type = resource_type;
  }

  //for testing
  createTestAlgo() {
    const requestObject = {
      details: {
        label: 'My First Algorithm',
      },
      name: 'my_first_algorithm',
      settings: {
        environment: 'cpu',
        language: 'python3-1',
        license: 'apl',
        network_access: 'full',
        pipeline_enabled: true,
        source_visibility: 'closed',
      },
    };
    return requestObject;
  }
}

class Details {
  label: string;
  summary: string;
  tagline: string;

  constructor(label: string, summary: string, tagline: string) {
    this.label = label;
    this.summary = summary;
    this.tagline = tagline;
  }
}

class Settings {
  algorithm_callability: string;
  environment: string;
  language: string;
  licence: string;
  network_access: string;
  package_set: string;
  pipeline_enabled: boolean;
  source_visibility: string;

  constructor(
    algorithm_callability: string,
    environment: string,
    language: string,
    licence: string,
    network_access: string,
    package_set: string,
    pipeline_enabled: boolean,
    source_visibility: string
  ) {
    this.algorithm_callability = algorithm_callability;
    this.environment = environment;
    this.language = language;
    this.licence = licence;
    this.network_access = network_access;
    this.package_set = package_set;
    this.pipeline_enabled = pipeline_enabled;
    this.source_visibility = source_visibility;
  }
}

class VersionInfo {
  git_hash: string;
  release_notes: string;
  sample_input: string;
  sample_output: string;
  semantic_version: string;

  constructor(
    git_hash: string,
    release_notes: string,
    sample_input: string,
    sample_output: string,
    semantic_version: string
  ) {
    this.git_hash = git_hash;
    this.release_notes = release_notes;
    this.sample_input = sample_input;
    this.sample_output = sample_output;
    this.semantic_version = semantic_version;
  }
}

class Source {
  repository_https_url: string;
  repository_name: string;
  repository_owner: string;
  repository_ssh_url: string;
  scm: SCM;

  constructor(
    repository_https_url: string,
    repository_name: string,
    repository_owner: string,
    repository_ssh_url: string,
    scm: SCM
  ) {
    this.repository_https_url = repository_https_url;
    this.repository_name = repository_name;
    this.repository_owner = repository_owner;
    this.repository_ssh_url = repository_owner;
    this.repository_ssh_url = repository_ssh_url;
    this.scm = scm;
  }
}

class SCM {
  default: boolean;
  enabled: boolean;
  id: string;
  oauth: OAuth;
  provider: string;
  urls: URLS;

  constructor(
    _default: boolean,
    enabled: boolean,
    id: string,
    oauth: OAuth,
    provider: string,
    urls: URLS
  ) {
    this.default = _default;
    this.enabled = enabled;
    this.id = id;
    this.oauth = oauth;
    this.provider = provider;
    this.urls = urls;
  }
}

class OAuth {
  client_id: string;

  constructor(client_id: string) {
    this.client_id = client_id;
  }
}

class URLS {
  api: string;
  ssh: string;
  web: string;

  constructor(api: string, ssh: string, web: string) {
    this.api = api;
    this.ssh = ssh;
    this.web = web;
  }
}

class Compilation {
  output: string;
  successful: boolean;

  constructor(output: string, successful: boolean) {
    this.output = output;
    this.successful = successful;
  }
}

class Build {
  build_id: string;
  commit_sha: string;
  finished_at: string;
  resource_type: string;
  started_at: string;
  status: string;
  version_info: VersionInfo;

  constructor(
    build_id: string,
    commit_sha: string,
    finished_at: string,
    resource_type: string,
    started_at: string,
    status: string,
    version_info: VersionInfo
  ) {
    this.build_id = build_id;
    this.commit_sha = commit_sha;
    this.finished_at = finished_at;
    this.resource_type = resource_type;
    this.started_at = started_at;
    this.status = status;
    this.version_info = version_info;
  }
}

interface Organization {
  org_contact_name: string;
  org_email: string;
  org_label: string;
  org_name: string;
  resource_type: string;

  org_url?: string;
  external_id?: string;
  external_admin_group_id?: string;
  external_member_group_id?: string;
  self_link?: string;
}

interface AlgorithmVersionsList {
  marker: string;
  next_link: string;
  results: Algorithm[];
}

interface AlgorithmBuildsList {
  marker: string;
  next_link: string;
  results: Build[];
}

interface AlgorithmSCMAuthorizationStatus {
  authorization_status: string;
  scm_username: string;
  scm_organizations: SCMOrganizations;
}

interface SCMOrganizations {
  scm_username: string;
  access_level: string;
}

export {
  Algorithm,
  Details,
  Settings,
  VersionInfo,
  Source,
  SCM,
  Compilation,
  Build,
  AlgorithmVersionsList,
  AlgorithmBuildsList,
  AlgorithmSCMAuthorizationStatus,
  Organization,
};
