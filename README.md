# DevOps Utils Server

**Empowering your DevOps and Development workflows with server environment insights and rapid command execution.**

This utility provides a streamlined way to troubleshoot your server environment or quickly execute commands within your local setup. At its core, the server exposes an interface that displays the HTTP headers it receives and the server's environment variables. Additionally, it features an integrated in-browser terminal, directly connected to this utility's server.

To leverage the full capabilities of this tool, you'll need to pair it with the frontend component, [devops-utils-web](https://github.com/zhangyi921/devops-utils-web).

![Terminal screenshot](https://raw.githubusercontent.com/zhangyi921/devops-utils-server/refs/heads/main/Screenshot1.png)

## Getting Started

### Local Development

For local experimentation and development, simply run both the `devops-utils-web` and `devops-utils-server` applications concurrently.

### Production Deployment

To deploy in a production environment:

1.  Build the `devops-utils-web` frontend.
2.  Copy the generated `dist` folder from the `devops-utils-web` build output into the root directory of this `devops-utils-server` project.
3.  Deploy the `devops-utils-server` application to your preferred server or Docker environment.