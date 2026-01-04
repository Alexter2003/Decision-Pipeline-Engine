/*
  Warnings:

  - You are about to drop the `Rule_Group_Rule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rule_execution_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rule_Group_Rule" DROP CONSTRAINT "Rule_Group_Rule_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Rule_Group_Rule" DROP CONSTRAINT "Rule_Group_Rule_rule_id_fkey";

-- DropForeignKey
ALTER TABLE "rule_execution_logs" DROP CONSTRAINT "rule_execution_logs_group_id_fkey";

-- DropTable
DROP TABLE "Rule_Group_Rule";

-- DropTable
DROP TABLE "rule_execution_logs";

-- CreateTable
CREATE TABLE "RE_RuleGroupRule" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "rule_id" INTEGER NOT NULL,

    CONSTRAINT "RE_RuleGroupRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RE_RuleExecutionLogs" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "input_payload" JSONB NOT NULL,
    "output_payload" JSONB NOT NULL,
    "rules_triggered" JSONB NOT NULL,
    "execution_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RE_RuleExecutionLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RE_RuleGroupRule" ADD CONSTRAINT "RE_RuleGroupRule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "RE_RuleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RE_RuleGroupRule" ADD CONSTRAINT "RE_RuleGroupRule_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "RE_Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RE_RuleExecutionLogs" ADD CONSTRAINT "RE_RuleExecutionLogs_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "RE_RuleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
