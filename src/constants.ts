import path from "path"
export default {
  POD_TEMPLATE_FILE_PATH: path.resolve("./dist", "./templates/kubernetes/pod.yml"),
  REPRODUCIBLE_POD_TEMPLATE_FILE_PATH: path.resolve("./dist", "./templates/kubernetes/reproducible_pod.yml"),
  WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH: path.resolve("./dist", "./templates/kubernetes/workflow_descriptor_config_map.yml"),
  IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH: path.resolve("./dist", "./templates/kubernetes/irods_password_secret.yml")
}
