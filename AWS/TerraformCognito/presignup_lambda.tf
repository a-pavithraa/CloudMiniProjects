resource "random_pet" "lambda_bucket_name" {
  prefix = "learn-terraform-functions"
  length = 4
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
   acl           = "private"
  force_destroy = true
}
data "archive_file" "lambda_presignup_cognito" {
  type = "zip"

  source_dir  = "${path.module}/presignup_cognito"
  output_path = "${path.module}/presignup_cognito.zip"
}

resource "aws_s3_bucket_object" "lambda_presignup_cognito" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "presignup_cognito.zip"
  source = data.archive_file.lambda_presignup_cognito.output_path

  etag = filemd5(data.archive_file.lambda_presignup_cognito.output_path)
}

resource "aws_lambda_function" "presignup_cognito" {
  function_name = "PresignupCognito"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_bucket_object.lambda_presignup_cognito.key

  runtime = "nodejs14.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.lambda_presignup_cognito.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "presignup_cognito" {
  name = "/aws/lambda/${aws_lambda_function.presignup_cognito.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_permission" "cognito" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.presignup_cognito.function_name
  principal     = "cognito-idp.amazonaws.com"

  source_arn = "${module.aws_cognito_user_pool_complete_example.arn}"
}
