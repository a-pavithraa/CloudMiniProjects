resource "aws_ecs_cluster" "main" {
  name = var.cluster_name

  tags = {
    Name = var.cluster_name
  }
}
resource "aws_cloudwatch_log_group" "stockservicecloudwatch" {
  name = "stockservicecloudwatchgroup"

  tags = {
    Environment = "production"
    Application = "serviceA"
  }
}

resource "aws_cloudwatch_log_group" "utilityservicecloudwatch" {
  name = "utilityervicecloudwatchgroup"

  tags = {
    Environment = "production"
    Application = "serviceA"
  }
}
resource "aws_cloudwatch_log_stream" "stockservicecloudwatch" {
  name           = "stockservicecloudwatch"
  log_group_name = aws_cloudwatch_log_group.stockservicecloudwatch.name
}

resource "aws_cloudwatch_log_stream" "utilityservicecloudwatch" {
  name           = "utilityservicecloudwatch"
  log_group_name = aws_cloudwatch_log_group.utilityservicecloudwatch.name
}
resource "aws_ecs_task_definition" "main" {
  family             =  var.container_name
  task_role_arn = aws_iam_role.task_role.arn
  execution_role_arn = aws_iam_role.main_ecs_tasks.arn
  network_mode       = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu    = var.fargate_cpu*2
  memory = var.fargate_memory*2
  container_definitions = <<DEFINITION
    [
      {
        "name": "${var.container_name}",
        "image": "${var.api_image}",
        "essential": true,
        "portMappings": [
          {
            "containerPort": 8102,
            "hostPort": 8102
          }
        ],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "${aws_cloudwatch_log_group.stockservicecloudwatch.name}",
            "awslogs-region": "us-east-1",
            "awslogs-stream-prefix": "stockservicecloudwatch"
          }
        }
      },
      {
        "name": "aws-utitlity",
        "image": "pavithravasudevan/aws-utility-service:0.0.1-SNAPSHOT",
        "essential": true,
        "portMappings": [
          {
            "containerPort": 8080,
            "hostPort": 8080
          }
        ],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "${aws_cloudwatch_log_group.utilityservicecloudwatch.name}",
            "awslogs-region": "us-east-1",
            "awslogs-stream-prefix": "utilityservicecloudwatch"
          }
        }
      }
      
    ]
    DEFINITION
  
}
resource "aws_ecs_service" "apiecsservice" {
  name            = "apiecsservice"
depends_on = [
    aws_ecs_task_definition.main
  ]
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.family
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [module.ecstask_sg.this_security_group_id]
    subnets         =  module.vpc.private_subnets
  }

  load_balancer {
    target_group_arn =module.alb.target_group_arns[0]
    container_name   = var.container_name
    container_port   = var.app_port
  }


}



